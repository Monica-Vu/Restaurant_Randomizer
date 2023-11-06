# Frontend
## React Fragments 
* React Fragments allow you to return multiple elements from a React component by allowing you to group a list of children without adding an extra DOM element
* If possible, try to use a fragment as `div` elements require more resources -> causes pages to slow down & harder to debug. Fragments have a smaller dom -> renders fast and allows multiple JSX components to be return, which addresses the issue of having invalid HTML markups
* You could also use `<></>` 

**Source(s):** https://refine.dev/blog/how-react-fragments-is-works/#what-is-react-fragment

## React Testing Library - Act
* the "act" function is a utility provided by React Testing Library and React that helps manage asynchronous code and side effects during rendering and updates.
* In React, when you perform certain actions (ex/rendering a component, updating a state, firing events), React may trigger asynchronous updates or side effects so `act` is used to ensure these updates are properly flushed out so you tests waits them to complete before making assertions

# Backend

# Challenges
* FE unit tests 