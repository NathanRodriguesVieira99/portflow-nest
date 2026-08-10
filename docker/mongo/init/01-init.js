db = db.getSiblingDB("terminal_service");

db.createUser({
  user: "terminal_service",
  pwd: "terminal_service",
  roles: [
    {
      role: "readWrite",
      db: "terminal_service",
    },
  ],
});

db.createCollection("terminals");

db.terminals.insertMany([
  {
    terminalId: "T1",
    name: "Atlantic Terminal",
    isActive: true,
    acceptedCargoTypes: ["ELECTRONICS", "MACHINERY", "TEXTILE"],
    capacity: {
      maxContainers: 5000,
      currentOccupation: 3120,
    },
    zones: [
      {
        code: "A1",
        type: "GENERAL_CARGO",
        isAvailable: true,
      },
      {
        code: "R1",
        type: "REFRIGERATED",
        isAvailable: false,
        unavailableReason: "MAINTENANCE",
      },
    ],
    restrictions: {
      acceptsDangerousCargo: false,
      acceptsRefrigeratedCargo: true,
      maxHeightInMeters: 4.5,
      maxWeightInTons: 28,
    },
    equipments: ["CRANE", "FORKLIFT", "SCANNER"],
  },
  {
    terminalId: "T2",
    name: "Pacific Terminal",
    isActive: true,
    acceptedCargoTypes: ["FOOD", "REFRIGERATED", "PHARMACEUTICALS"],
    capacity: {
      maxContainers: 3000,
      currentOccupation: 2800,
    },
    zones: [
      {
        code: "F1",
        type: "REFRIGERATED",
        isAvailable: true,
      },
    ],
    restrictions: {
      acceptsDangerousCargo: false,
      acceptsRefrigeratedCargo: true,
      maxHeightInMeters: 3.8,
      maxWeightInTons: 22,
    },
    equipments: ["COLD_ROOM", "FORKLIFT", "SCANNER"],
  },
  {
    terminalId: "T3",
    name: "Chemical Terminal",
    isActive: false,
    acceptedCargoTypes: ["CHEMICALS", "DANGEROUS_CARGO"],
    capacity: {
      maxContainers: 1500,
      currentOccupation: 900,
    },
    zones: [
      {
        code: "Q1",
        type: "DANGEROUS_CARGO",
        isAvailable: false,
        unavailableReason: "INACTIVE_TERMINAL",
      },
    ],
    restrictions: {
      acceptsDangerousCargo: true,
      acceptsRefrigeratedCargo: false,
      maxHeightInMeters: 4.0,
      maxWeightInTons: 30,
    },
    equipments: ["CHEMICAL_SENSOR", "SCANNER", "SPECIAL_CRANE"],
  },
]);
