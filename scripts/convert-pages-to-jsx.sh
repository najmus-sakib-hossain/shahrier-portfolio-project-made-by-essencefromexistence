#!/bin/bash

# Convert Home.tsx to Home.jsx
if [ -f "resources/js/pages/Home/Page/Home.tsx" ]; then
  mv "resources/js/pages/Home/Page/Home.tsx" "resources/js/pages/Home/Page/Home.jsx"
  echo "✓ Converted Home.tsx to Home.jsx"
fi

# Convert Blogs.tsx to Blogs.jsx
if [ -f "resources/js/pages/Blogs/Page/Blogs.tsx" ]; then
  mv "resources/js/pages/Blogs/Page/Blogs.tsx" "resources/js/pages/Blogs/Page/Blogs.jsx"
  echo "✓ Converted Blogs.tsx to Blogs.jsx"
fi

# Convert BlogDetails.tsx to BlogDetails.jsx
if [ -f "resources/js/pages/BlogDetails/Page/BlogDetails.tsx" ]; then
  mv "resources/js/pages/BlogDetails/Page/BlogDetails.tsx" "resources/js/pages/BlogDetails/Page/BlogDetails.jsx"
  echo "✓ Converted BlogDetails.tsx to BlogDetails.jsx"
fi

# Convert Books.tsx to Books.jsx
if [ -f "resources/js/pages/Books/Page/Books.tsx" ]; then
  mv "resources/js/pages/Books/Page/Books.tsx" "resources/js/pages/Books/Page/Books.jsx"
  echo "✓ Converted Books.tsx to Books.jsx"
fi

# Convert Events.tsx to Events.jsx
if [ -f "resources/js/pages/Events/Page/Events.tsx" ]; then
  mv "resources/js/pages/Events/Page/Events.tsx" "resources/js/pages/Events/Page/Events.jsx"
  echo "✓ Converted Events.tsx to Events.jsx"
fi

# Convert Videos.tsx to Videos.jsx
if [ -f "resources/js/pages/Videos/Page/Videos.tsx" ]; then
  mv "resources/js/pages/Videos/Page/Videos.tsx" "resources/js/pages/Videos/Page/Videos.jsx"
  echo "✓ Converted Videos.tsx to Videos.jsx"
fi

# Convert Donation.tsx to Donation.jsx
if [ -f "resources/js/pages/Donation/Page/Donation.tsx" ]; then
  mv "resources/js/pages/Donation/Page/Donation.tsx" "resources/js/pages/Donation/Page/Donation.jsx"
  echo "✓ Converted Donation.tsx to Donation.jsx"
fi

# Convert DonateDetails.tsx to DonateDetails.jsx
if [ -f "resources/js/pages/DonateDetails/Page/DonateDetails.tsx" ]; then
  mv "resources/js/pages/DonateDetails/Page/DonateDetails.tsx" "resources/js/pages/DonateDetails/Page/DonateDetails.jsx"
  echo "✓ Converted DonateDetails.tsx to DonateDetails.jsx"
fi

# Convert Technology.tsx to Technology.jsx
if [ -f "resources/js/pages/Technology/Page/Technology.tsx" ]; then
  mv "resources/js/pages/Technology/Page/Technology.tsx" "resources/js/pages/Technology/Page/Technology.jsx"
  echo "✓ Converted Technology.tsx to Technology.jsx"
fi

# Convert LifeEvent.tsx to LifeEvent.jsx
if [ -f "resources/js/pages/LifeEvents/Page/LifeEvent.tsx" ]; then
  mv "resources/js/pages/LifeEvents/Page/LifeEvent.tsx" "resources/js/pages/LifeEvents/Page/LifeEvent.jsx"
  echo "✓ Converted LifeEvent.tsx to LifeEvent.jsx"
fi

# Convert Entepreneouship.tsx to Entepreneouship.jsx
if [ -f "resources/js/pages/Entepreneourship/Page/Entepreneouship.tsx" ]; then
  mv "resources/js/pages/Entepreneourship/Page/Entepreneouship.tsx" "resources/js/pages/Entepreneourship/Page/Entepreneouship.jsx"
  echo "✓ Converted Entepreneouship.tsx to Entepreneouship.jsx"
fi

# Convert AboutMe.tsx to AboutMe.jsx
if [ -f "resources/js/pages/AboutMe/Page/AboutMe.tsx" ]; then
  mv "resources/js/pages/AboutMe/Page/AboutMe.tsx" "resources/js/pages/AboutMe/Page/AboutMe.jsx"
  echo "✓ Converted AboutMe.tsx to AboutMe.jsx"
fi

# Convert Contact.tsx to Contact.jsx
if [ -f "resources/js/pages/Contact/Page/Contact.tsx" ]; then
  mv "resources/js/pages/Contact/Page/Contact.tsx" "resources/js/pages/Contact/Page/Contact.jsx"
  echo "✓ Converted Contact.tsx to Contact.jsx"
fi

echo ""
echo "✅ All frontend pages converted from .tsx to .jsx"
