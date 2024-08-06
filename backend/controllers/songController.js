const Song = require("../models/songModel");
const mongoose = require("mongoose");

//get all songs
const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({}).sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single song

const getSong = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such song" });
    }

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ error: "No such song" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create new song

const createSong = async (req, res) => {
  const { title, date, venue, city, state, comment, upvotes, userName } =
    req.body;

  //add doc to db
  try {
    const newSong = await Song.create({
      title,
      date,
      venue,
      city,
      state,
      comment,
      upvotes,
      userName,
    });
    res.status(200).json(newSong);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a song

const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such song" });
    }

    const song = await Song.findOneAndDelete({ _id: id });

    if (!song) {
      return res.status(404).json({ error: "No such song" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a song

const updateSong = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such song" });
    }

    const song = await Song.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!song) {
      return res.status(404).json({ error: "No such song" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
};
