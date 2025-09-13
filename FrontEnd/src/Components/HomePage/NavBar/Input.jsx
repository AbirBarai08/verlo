import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function Input({ value, setValue }) {
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = React.useState([
    { title: "Smartphones" },
    { title: "Laptops" },
    { title: "Festive Gifts" }
  ]);

  React.useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      const recent = JSON.parse(stored);
      const merged = [...suggestions];
      recent.forEach(item => {
        if (!merged.find(s => s.title === item.title)) {
          merged.push(item);
        }
      });
      setSuggestions(merged);
    }
  }, []);

  const searchProducts = (e , value) => {
    if(e.key === 'Enter') {
      const searchValue = value.title.trim();
      const product = encodeURIComponent(searchValue);
      navigate(`/products/search?product=${product}`);
    }
  }

  return (
    <Box onKeyUp={(e) => searchProducts(e , value)}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({ title: newValue });
            const updated = [...suggestions, { title: newValue }];
            setSuggestions(updated);
            localStorage.setItem("recentSearches", JSON.stringify(updated));
          } else if (newValue?.inputValue) {
            setValue({ title: newValue.inputValue });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = createFilterOptions()(options, params);
          const { inputValue } = params;
          const isExisting = options.some(o => o.title === inputValue);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Search "${inputValue}"`
            });
          }
          return filtered;
        }}
        options={suggestions}
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : option.inputValue
            ? option.inputValue
            : option.title
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for products"
            inputProps={{
              ...params.inputProps,
              'aria-label': 'search',
              style: { paddingLeft: '40px', fontSize: '1rem' }
            }}
            variant="standard"
            sx={{
              width: '100%',
              '& .MuiInput-root': {
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                fontSize: {
                  xs: '0.5rem', // smaller font on extra-small screens (mobile)
                  sm: '1rem'
                },
              },
              '& .MuiInput-underline:before': {
                borderBottom: 'none'
              },
              '& .MuiInput-underline:hover:before': {
                borderBottom: 'none'
              },
              '& .MuiInput-underline:after': {
                borderBottom: 'none'
              }
            }}
          />
        )}
        sx={{
          width: '100%',
          maxWidth: '100%',
          '& .MuiAutocomplete-endAdornment': {
            right: 8
          }
        }}
        PopperComponent={(props) => (
            <Popper {...props} placement="bottom-start" modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}>
                <Paper
                    elevation={3}
                    sx={{
                    maxHeight: 200, // ✅ limit height of dropdown
                    overflowY: 'auto',
                    width: props.style?.width || '100%' // match width of input
                    }}
                >
                    {props.children}
                </Paper>
            </Popper>
        )}
        freeSolo
      />
    </Box>
  );
}