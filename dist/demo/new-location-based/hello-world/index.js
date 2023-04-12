var currentstate = document.getElementById("currentstate");


// create an IntersectionObserver instance
const observer = new IntersectionObserver((entries, observer) => {
    // loop through the entries
    entries.forEach(entry => {
      if (entry.target.id === 'currentstate' && entry.isIntersecting) {
        // the target element is now visible in the viewport, so execute your code
        // your code goes here
        console.log("Target element found!");
        // stop observing the target element
        observer.unobserve(entry.target);
      }
    });
  });
  
  // start observing the target element
  const targetElement = document.querySelector('#currentstate');
  if (targetElement) {
    observer.observe(targetElement);
  }
  