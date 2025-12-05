"use client";

import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField, Rating } from "@mui/material";
import { useState } from "react";
import createNewCoffee from "@/lib/createNewCoffee";
import {CoffeeProps} from "@/types/CoffeeProps";
//import LinkPreview from "./LinkPreview";


export default function NewCoffeeForm({ append }: { append: (post: CoffeeProps) => void }) {
    const [shopName, setShopName] = useState("");
    const [coffeeType, setCoffeeType] = useState("");
    const [rating, setRating] = useState<number |null>(null);
    const [review, setReview] = useState("");
    const [picture, setPicture] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [newPost, setNewPost] = useState<CoffeeProps | null>(null);
    const [error, setError] = useState<string>("");

    return (
        <form className="w-96 rounded-xl p-4 bg-brown-400"
              onSubmit ={
                  async(event) =>
                  {
                      event.preventDefault();
                      setError("");
                      setNewPost(null);

                      if (!shopName || !coffeeType || !rating || !review) {
                          setError("Please fill in all required fields.");
                          return;
                      }

                      createNewCoffee({
                          shopName,
                          coffeeType,
                          rating: rating,
                          review,
                          picture,
                          category,
                          location,
                      })

                          .then((coffee) => { append(coffee);
                              setNewPost(coffee); })
                          .catch((e)=> {console.log("this error occurred: "+ e);
                              setError("Duplicate entry, wasn't able to create post.");
                          });
                  }

              }>

            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%" }}
                label="Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
            />
            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%", marginTop: "0.5rem" }}
                label="Coffee Type"
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value)}
                required
            />

            <div className="mt-2">
                <FormHelperText>Rating (1-5)</FormHelperText>
                <Rating
                    name="coffee-rating"
                    value ={rating}
                    precision={1}
                    max={5}
                    onChange={(_, newValue) => setRating(newValue)}
                />
            </div>

            <Textarea
                sx={{ padding: "0.5rem", height: "100px", width: "100%", borderRadius: 0, marginTop: "0.5rem" }}
                variant="soft"
                placeholder="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
            />

            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%", marginTop: "0.5rem" }}
                label="Picture"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
            />

            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%", marginTop: "0.5rem" }}
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%", marginTop: "0.5rem" }}
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <FormHelperText>Fill in all required fields!</FormHelperText>

            <div className="w-full flex justify-center">
                <Button
                    sx={{ width: "80px" }}
                    variant="contained"
                    type="submit"
                    disabled={!shopName || !coffeeType || !rating || !review}
                >
                    post!
                </Button>
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {newPost && <p className="text-green-600 mt-2">Post created successfully!</p>}


        </form>
    );
}
