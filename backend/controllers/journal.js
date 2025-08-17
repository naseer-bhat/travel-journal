import Journal from "../models/Journal.js";

export const createJournal = async (req, res) => {
  try {
    const { title, content, photos, location } = req.body;
    const newJournal = await Journal.create({
      title,
      content,
      photos,
      location,
      author: req.user.id,
    });
    return res.status(201).json({ success: true, data: newJournal });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
export const getAllJournal = async (req, res) => {
  try {
    const Journals = await Journal.find().populate(
      "author",
      "email displayName avatar"
    );
    return res.status(200).json({ success: true, data: journals });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
export const getJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id).populate(
      "author",
      "email displayName avatar"
    );
    return res.status(200).json({ success: true, data: journal });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
export const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal)
      return res.status(404).json({ success: false, msg: "Journal not found" });

    // Only author can update
    if (journal.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }

    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({ success: true, data: updatedJournal });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal)
      return res.status(404).json({ success: false, msg: "Journal not found" });

    // Only author can delete
    if (journal.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, msg: "Not authorized" });
    }

    await journal.deleteOne();
    return res.status(200).json({ success: true, msg: "Journal deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
