const current_container = $('.current_orders');
const past_container = $('.past_orders');
const name_field = $('.username');
const greeting_field = $('.greeting');

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function ({ orders, name }) {
    current_container.empty();
    past_container.empty();

    orders.forEach((order) => {
      if (order.complete) {
        past_container.append(`   <li
        class="order-item list-group-item disabled"
      >
        ${order.name}
      </li>`);
      } else {
        current_container.append(`   <li
        class="order-item list-group-item"
      >
        ${order.name} <i class="fas fa-check" data-id="${order.id}"></i>
      </li>`);
      }
    });

    name_field.text(name);
    greeting_field.text(`Welcome back ${name}! Enjoy your coffee!`);

    $('.fa-check').on('click', (e) => {
      const id = $(e.target).data('id');

      $.ajax({ url: '/api/orders', method: 'PUT', data: { id } }).then(() => {
        location.reload();
      });
    });
  });
});
