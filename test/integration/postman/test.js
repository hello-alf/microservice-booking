let index = parseInt(pm.environment.get('index'));
let properties = JSON.parse(pm.environment.get('properties'));
let property = properties[index];

pm.test('Status code 201', function () {
  pm.response.to.have.status(201);
});

pm.test('Validate name', function () {
  const response = pm.response.json();
  pm.expect(response.name).to.eql(properties[index].name);
});

pm.test('Validate price', function () {
  const response = pm.response.json();
  pm.expect(response.pricePerNight.value).to.eql(
    properties[index].pricePerNight,
  );
});

index = index + 1;
if (index >= properties.length) {
  index = 0;
}

pm.environment.set('index', index);
