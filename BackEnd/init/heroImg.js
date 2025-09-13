const heroImages = [
  {
    title: "Summer Clearance Sale",
    subtitle: "Up to 70% off · Limited time!",
    image: { url: "http://localhost:5000/images/heroimage1.jpg" },
    catagory: "fashion",
    isActive: true,
    endDate: "2026-08-01",
    discountType: "percentage",
    discountValue: 70
  },
  {
    title: "Home Essentials Restocked",
    subtitle: "Trending picks for your space",
    image: { url: "http://localhost:5000/images/heroimage3.jpg" },
    catagory: "appliances",
    isActive: true,
    endDate: "2026-09-01",
    discountType: "percentage",
    discountValue: 20
  },
  {
    title: "Winter Wardrobe Upgrade",
    subtitle: "Stylish layers for cold days",
    image: { url: "http://localhost:5000/images/heroimage5.jpg" },
    catagory: "fashion",
    isActive: true,
    endDate: "2026-01-15",
    discountType: "percentage",
    discountValue: 20
  }
];

module.exports = { data : heroImages };