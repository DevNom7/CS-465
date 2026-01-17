// Main controller: contains the logic for rendering the homepage
// a controller in simple terms is a JS file that contains the logic for a specific route or set of routes
const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways'
  });
};

module.exports = {
  index
};
