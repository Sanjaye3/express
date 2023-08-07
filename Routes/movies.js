import express from "express";
import { getAllMovies, getMoviesById, createMovie, deleteMovie, updateMovie } from "./helper.js";

const router = express.Router();


router.get('/', async function (req, res) {
    // const {rating} = req.query;
    console.log(req.query);
    const filter = req.query;
    if(filter.rating){
      filter.rating = +filter.rating;
    }
   

    const allMovies = await getAllMovies(filter);

    res.send(allMovies);


    //  rating ? res.send( movies.filter((mv) => mv.rating == rating)) : res.send(movies);
  })


router.get('/:id', async function (request, response) {
    const { id }  = request.params;
    
    const movie = await getMoviesById(id);
    
    movie ?  response.send(movie) : response.status(404).send({msg : "No Such Movie Found"});
  
    // console.log(request.params);
  })
  
  
  
router.post("/",async function (request,response) {
    const addmovie = request.body;
    console.log(addmovie);
  
    const result = await createMovie(addmovie);
    response.send(result);
  })
  
router.delete('/:id', async function (request, response) {
    const { id }  = request.params;
    
    const result = await deleteMovie(id)
    
    result ?  response.send(result) : response.status(404).send({msg : "No Such Movie Found"});
  
    // console.log(request.params);
  })
  
router.put('/:id', async function (request, response) {
    const { id }  = request.params;
    const updateData = request.body;
    
    const result = await updateMovie(id, updateData);
    
    response.send(result)
   
  
    // console.log(request.params);
  })







export const moviesRouter = router;




