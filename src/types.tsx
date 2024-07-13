export type Driver = {
  id: string;
  name: String;
  salary: number;
};

export type AddDriverDto = {
  name: String;
  salary: number;
};

export type Truck = {
  id: String;
  year: number;
  type: String;
};

export type AddTruckDto = {
  year: number;
  type: String;
};

export type Assignment = {
  id: String;
  legs: Leg[];
  product: String;
  pickupLocation: String;
  destination: String;
  driverDto: Driver;
  truckDto: Truck;
};

export type AddAssignmentDto = {
  product: String;
  pickupLocation: String;
  destination: String;
};

export type Leg = {
  id: String;
  startDate: Date;
  endDate: Date;
  startLocation: String;
  endLocation: String;
};

export type AddLegDto = {
  assignmentId: String;
  startDate: Date;
  endDate: Date;
  startLocation: String;
  endLocation: String;
};
