let properties = JSON.parse(pm.environment.get('properties'));
let index = parseInt(pm.environment.get('index'));

if (index >= properties.length) {
  index = 0;
}

let property = properties[index];

pm.environment.set('name', property.name);
pm.environment.set('pricePerNight', property.pricePerNight);
