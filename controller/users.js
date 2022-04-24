import User from "../models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ nbHits: users.length, users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      now: true,
      runValidator: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ msg: `No user with the id: ${id}` });
    }
    res.status(200).json({ msg: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ status: "500", msg: error });
  }
};

const updateManyUsers = async (req, res) => {
  try {
    const updatedUsers = await User.updateMany({ selected: true }, req.body, {
      now: true,
    });
    if (!updatedUsers) res.status(404).json({ msg: `No user found` });
    res.status(200).json({ msg: "User updated successfully", updatedUsers });
  } catch (error) {
    res.status(500).json({ status: "500", msg: error });
  }
};

// const deleteUser = async (req, res) => {
//     try {
//         const {id} = req.params;

//         const deletedUser = await User.findOneAndDelete({_id: id});
//         if (!deletedUser) res.status(404).json({msg: `No user with the id: ${id}`});
//         res.status(200).json({msg: 'User deleted successfully', user: null});
//     } catch (error) {
//         res.status(500).json({msg: error});
//     }
// }

const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany({ selected: true });
    if (!deletedUsers) res.status(404).json({ msg: "No user found" });
    res.status(200).json({ msg: "Users deleted successfully", user: null });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { getAllUsers, updateUser, updateManyUsers, deleteUsers };
