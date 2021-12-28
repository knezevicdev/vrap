// TECH DEBT: This needs to be refactored.
/**
 * Given vehicle object and attribute (eg. make, model, price), return value of specified attribute
 */
export function getVehicleAttribute(vehicle = {}, attribute) {
  let value;
  try {
    const { attributes = {}, id } = vehicle;
    switch (attribute) {
      case 'id':
        return (value = id);
      case 'price':
        return (value = vehicle && attributes.listingPrice);
    }

    return (value = (vehicle && attributes[attribute]) || vehicle[attribute]);
  } catch (e) {
    // console.error('getVehicleAttribute() error', e)
  }

  return value;
}

export function vehicleToString(vehicleData) {
  const year = getVehicleAttribute(vehicleData, 'year');
  const make = getVehicleAttribute(vehicleData, 'make');
  const model = getVehicleAttribute(vehicleData, 'model');
  return `${year} ${make} ${model}`;
}
