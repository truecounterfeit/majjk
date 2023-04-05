#OVERVIEW
Our submission is focused around a use case of one of our current clients who offers monthly chocolate subscriptions to customers. The current implementation utilizes a 3rd party subscriptions app to handle subscription orders, and one of the disadvantages of going this route is that the 3rd party subscription app will redirect the customer to an external checkout experience if subscription products exist in their cart.

Our solution essentially replaces the need for this app, using Stripe as the subscription mechanism, with the additional feature of the customer being able to choose to pick up their subscription in store using the new BOPIS feature in BigCommerce.

#ARCHITECTURE
- Stencil (for local development)
- Customized Cornerstone theme (customer facing front end)
    - Customization to product detail template/js where we pull in locations via GraphQL for the customer to choose from
    - Customization to checkout.html template to create the consignments for each order line item
- Netlify Serverless Functions (middleware connector between BC and Stripe)
