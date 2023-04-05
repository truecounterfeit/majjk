# OVERVIEW
Our submission is focused around a use case of one of our current clients who offers monthly chocolate subscriptions to customers. The current implementation utilizes a 3rd party subscriptions app to handle subscription orders, and one of the disadvantages of going this route is that the 3rd party subscription app will redirect the customer to an external checkout experience if subscription products exist in their cart.

Our solution essentially replaces the need for this app, using Stripe as the subscription mechanism, with the additional feature of the customer being able to choose to pick up their subscription in store using the new BOPIS feature in BigCommerce.

# ARCHITECTURE
- Stencil (for local development)
- Customized Cornerstone theme (customer facing front end)
    - Customization to product detail template/js where we pull in locations via GraphQL for the customer to choose from
    - Customization to checkout.html template to create the consignments for each order line item
- Netlify Serverless Functions (middleware connector between BC and Stripe) - https://github.com/JacksonBey/majjk-netlify
    - Recieves web hook request from BigCommerce on the order creation event
    - Gets the full order details from BigCommerce API in subsequent request
    - Uses order details, including consignment data to create Stripe subscription

# NOTES
The following are some aspects of our project as it stands today that we would work to better automate in a future, improved version
- Make this into an actual BC app
- Some product and customer data were initially created in Stripe manually
- Create web hook in Stripe to add stripe subscription data back to the BC order in a metafield, or note
