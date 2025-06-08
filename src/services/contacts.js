import { ContactsCollection } from '../models/contactSchema.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter, userId}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({userId});


  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite', filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType', filter.contactType);
  }

  const [totalItems, data] = await Promise.all([
    ContactsCollection.countDocuments({userId}),
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

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
