import { Router } from 'express';
import { renderNotesForm, newNote, allNotes, editNoteForm, editNote, deleteNote } from '../controllers/notes.controller.mjs';
import { isAuthenticated } from '../helpers/auth.mjs';

const router = Router();

router.get('/add', isAuthenticated, renderNotesForm);

router.post('/new-note', isAuthenticated, newNote);

router.get('/all', isAuthenticated, allNotes);

router.get('/edit/:id', isAuthenticated, editNoteForm);

router.put('/edit-note/:id', isAuthenticated, editNote);

router.delete('/delete/:id', isAuthenticated, deleteNote);

export default router;