Feature: Property API
  Scenario: Get all bookings
    When a GET request is made to "/booking"
    Then the response status code should be 200

  Scenario: Create a booking
    When a POST BOOKING request is made to "/booking" with the following data:
      | propertyId     | 64e9d9ee618e5cbdc7e2eadf |
      | numberOfGuests | 3 |
      | checkInDate | 2023-09-09T10:36:20.137Z |
      | checkOutDate | 2023-09-10T15:36:20.137Z |
    Then the create response status code should be 201

  Scenario: Create a booking Error
    When a POST BOOKING request is made to "/booking" with the following data:
      | propertyId     | 64e9d9ee618e5cbdc7e2eadf |
      | numberOfGuests | 3 |
      | checkInDate | 2023-08-26T10:36:20.137Z |
      | checkOutDate | 2023-08-27T15:36:20.137Z |
    Then the create response status code should be 400

  Scenario: Confirm booking
    When a POST request is made to "/booking/64fe970e20ede5e0b4139310/confirm" with no data:
    Then the create response status code should be 201

  Scenario: Confirm payment
    When a POST request is made to "/booking/64fe970e20ede5e0b4139310/payment/complete" with no data:
    Then the create response status code should be 201

  Scenario: Confirm payment Error
    When a POST request is made to "/booking/64fe970e20ede5e0b4139310/payment/complete" with no data:
    Then the create response status code should be 400

  Scenario: Cancel booking
    When a POST request is made to "/booking/64fe970e20ede5e0b4139310/cancel" with no data:
    Then the create response status code should be 201

  Scenario: Cancel booking Error
    When a POST request is made to "/booking/64fe970e20ede5e0b4139310/cancel" with no data:
    Then the create response status code should be 400

    Scenario: Confirm booking Error
    When a POST request is made to "/booking/64fe970e20ede5e0b4139310/confirm" with no data:
    Then the create response status code should be 400