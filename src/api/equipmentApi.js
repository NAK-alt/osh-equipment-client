import api from "./axios";

export const getAllEquipment = () => api.get("/equipment").then((r) => r.data);

export const getEquipmentById = (id) => api.get(`/equipment/${id}`).then((r) => r.data);

export const createEquipment = (formData) =>
  api.post("/equipment", formData).then((r) => r.data);

export const updateEquipment = (id, formData) =>
  api.put(`/equipment/${id}`, formData).then((r) => r.data);

export const deleteEquipment = (id) => api.delete(`/equipment/${id}`).then((r) => r.data);

export const removeEquipmentImage = (id) => api.delete(`/equipment/${id}/image`).then((r) => r.data);
