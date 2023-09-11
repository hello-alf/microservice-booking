Feature: Property API
  Scenario: Get all bookings
    When a GET request is made to "/booking"
    Then the response status code should be 200

  Scenario: Create a booking
    When a POST BOOKING request is made to "/booking" with the following data:
      | propertyId     | 64e9d9ee618e5cbdc7e2eadf |
      | numberOfGuests | 3 |
      | checkInDate | 2023-08-26T10:36:20.137Z |
      | checkOutDate | 2023-08-27T15:36:20.137Z |
    Then the create response status code should be 201

  Scenario: Confirm booking
    When a POST request is made to "/booking/64fe9b43646cf0b61c844d92/confirm" with no data:
    Then the create response status code should be 201

  Scenario: Confirm payment
    When a POST request is made to "/booking/64fe9b43646cf0b61c844d92/payment/complete" with no data:
    Then the create response status code should be 201

  Scenario: Cancel booking
    When a POST request is made to "/booking/64fe9b43646cf0b61c844d92/cancel" with no data:
    Then the create response status code should be 201