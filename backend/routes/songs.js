const express = require('express')
const {
    getSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
} =  require('../controllers/songController')


const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//GET all songs
router.get('/', getSongs)

//GET single song
router.get('/:id', getSong)

//require auth to post/update/delete
router.use(requireAuth)

//PATCH (update) song
router.patch('/:id', updateSong)


//POST new song
router.post('/', createSong)

//delete song
router.delete('/:id', deleteSong)


module.exports = router