import { AuthUser } from "@Types/types";
import { addUserValidator, deletedUserValidator, getUsersValidator, updateUserValidator } from "@Validate/addressBookValidator";
import { Request, Response } from 'express';
import { Types, model } from 'mongoose';
import { ValidationError } from 'yup';

const AddressBookModel = model('AddressBook')

export const addAddressBook = async (req: Request, res: Response) => {
  try {
    const { addUser } = addUserValidator.validateSync(req.body)
    const user = req.user as AuthUser;
    const newAddressBook = new AddressBookModel({ creator: user._id, user: addUser })
    const result = await newAddressBook.save()
    res.status(201).json({
      message: 'Address book created successfully',
      result,
    })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}

export const updateAddressBook = async (req: Request, res: Response) => {
  try {
    const { id, status } = updateUserValidator.validateSync({ ...req.params, ...req.body })
    const user = req.user as AuthUser;
    const result = await AddressBookModel.updateOne({ _id: id, creator: user._id }, { status })
    res.status(201).json({
      message: 'Address book updated successfully',
      result,
    })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}

export const deletedAddressBook = async (req: Request, res: Response) => {
  try {
    const { id } = deletedUserValidator.validateSync(req.params)
    const user = req.user as AuthUser;
    await AddressBookModel.findOneAndDelete({ _id: id, creator: user._id })
    res.status(201).json({
      message: 'Address book deleted successfully',
    })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}


export const getAddressBookUsers = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = getUsersValidator.validateSync(req.user)
    console.log(userId)
    const result = await AddressBookModel
      .find({ $or: [{ creator: userId }, { user: userId }] }, { user: { $cond: [{ $eq: ['$creator', new Types.ObjectId(userId)] }, '$user', '$creator'] } })
      .populate('user', 'email avatar userName')
    // const result = await AddressBookModel
    //   .find({ creator: userId })
    //   .populate('user', 'email avatar userName')
    res.status(200).json({
      message: 'Get address book successfully',
      result,
    })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}