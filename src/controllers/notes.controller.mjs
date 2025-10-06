import Note from '../models/notes.mjs';

export const renderNotesForm = (req, res) => {
  res.render('notes/new-note');
};

export const newNote = async (req, res) => {
  const { title, description } = req.body;
  const note = new Note({ title, description, userId: req.user.id });
  await note.save();
  req.flash('success_msg', 'New note created successfully!');
  res.redirect('/notes/all');
};

export const allNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: 'desc' });
  res.render('notes/all-notes', { notes });
};

export const editNoteForm = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (note.userId.toString() !== req.user.id.toString()) {
    req.flash('error_msg', 'You are not authorized to edit this note!');
    res.redirect('/notes/all');
  }
  res.render('notes/edit-notes', { note });
};

export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const note = await Note.findByIdAndUpdate(id, { title, description });
  req.flash('success_msg', 'Note updated successfully!');
  res.redirect('/notes/all');
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  req.flash('success_msg', 'Note deleted successfully!');
  res.redirect('/notes/all');
};