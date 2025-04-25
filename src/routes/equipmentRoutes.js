const express = require('express');
const Equipment = require('../models/equipmentModel');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

//Get all equipment
router.get('/all', async (req, res)=>{
  try{
    const allEquipment = await Equipment.find();
    res.json(allEquipment);

  }catch(error){
    res.status(500).json({message: "There was been an error getting all equipment"});
  }
})

// Get all equipment, user's saved, and user's created
router.get('/my-equipment', authenticateUser, async (req, res) => {
  try {
    const [allEquipment, user] = await Promise.all([
      Equipment.find(),
      User.findById(req.user.id)
    ]);

    const saved = allEquipment.filter(eq => user.savedEquipment?.includes(eq.id));
    const created = allEquipment.filter(eq => user.createdEquipment?.includes(eq.id));

    res.status(200).json({ all: allEquipment, saved, created });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// Create equipment and add to user's createdEquipment
router.post('/create', authenticateUser, async (req, res) => {
  try {
    const newEquipment = await Equipment.create(req.body);
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { createdEquipment: newEquipment._id }
    }, { new: true, upsert: true });

    res.status(201).json({message: "Equipment created successfully"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});
  
// Delete equipment and remove from user's createdEquipment
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    await Equipment.findOneAndDelete({ _id: req.params.id });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { createdEquipment: req.params.id }
    });

    res.status(200).json({ message: 'Equipment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});
  
// Save or unsave equipment
router.post('/toggle-save/:id', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const alreadySaved = user.savedEquipment?.includes(req.params.id);

    const update = alreadySaved
      ? { $pull: { savedEquipment: req.params.id } }
      : { $addToSet: { savedEquipment: req.params.id } };

    await User.findByIdAndUpdate(req.user.id, update);

    res.status(200).json({ message: alreadySaved ? 'Removed from saved' : 'Added to saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle saved status' });
  }
});

// Edit equipment
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const updated = await Equipment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit equipment' });
  }
});
  

  
export default router;