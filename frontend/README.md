## Micado Interview UI

Displays the number of active and recovered covid patients based on the date range in real time.

## Requirements

- [Yarn](https://yarnpkg.com/en/)

## Setup

- Run `yarn`
- Run `yarn start`


Note that I am aware of some minor UI bugs regarding the text overlap in the graph, and the last date in the react datepicker is always selected.

Looking back, I can put `<DraggableGrid />` and `<Header />` into its own separate components... but in my opinion, it looks fine as it is given this limited context. Refactor only when you need to.
(Easier to read, grid can be re-rendered constantly without touching the Header)
