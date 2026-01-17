// Travel controller: contains the logic for rendering the travel page
//practice creating another controller similar to main.js
const travel = (req, res) => {
  res.render('travel', { title: 'Travel' });
};

module.exports = { travel };
