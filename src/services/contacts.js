import { ContactsCollection } from '../models/contactSchema.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter }) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();


  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite', filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType', filter.contactType);
  }

  const [totalItems, data] = await Promise.all([
    ContactsCollection.countDocuments({}),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};
