export const paths = {
    all: {
      path: "#/",
      template: `
        <li>
          <a href="#/" class="selected">All</a>
        </li>
        <li>
          <a href="#/pending">Pending</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      `,
    },
    pending: {
      path: "#/pending",
      template: `
        <li>
          <a href="#/">All</a>
        </li>
        <li>
          <a href="#/pending" class="selected">Pending</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      `,
    },
    completed: {
      path: "#/completed",
      template: `
        <li>
          <a href="#/">All</a>
        </li>
        <li>
          <a href="#/pending">Pending</a>
        </li>
        <li>
          <a href="#/completed" class="selected">Completed</a>
        </li>
      `,
    }
  }