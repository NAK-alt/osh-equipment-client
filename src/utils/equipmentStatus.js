export function normalizeEquipmentStatus(status) {
  return status === "Low Stock" ? "Available" : status;
}