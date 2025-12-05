"use client";

import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField, Rating } from "@mui/material";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import createNewCoffee from "@/lib/createNewCoffee";
import {CoffeeProps} from "@/types/CoffeeProps";
import {useSession} from "next-auth/react";
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
    const {data: session, status} = useSession();


    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPicture(previewURL);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "image/*": [] },
    });

    return (
        <form className="w-96 rounded-xl p-4 text-[#452B1F]"
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

                      let user = null;
                      let email = null;
                      let prof_pic = null;

                      if(status === "unauthenticated" || status === "loading") {
                          user = "Anonymous";
                          email = "Anonymous";
                          prof_pic = "public/user-icon1.jpeg";
                      }else {
                          user = session?.user?.name;
                          email = session?.user?.email;
                          prof_pic = session?.user?.image;
                      }

                      createNewCoffee({
                          shopName,
                          coffeeType,
                          rating: rating,
                          review,
                          picture,
                          category,
                          location,
                          user,
                          email,
                          prof_pic
                      })

                          .then((coffee) => { append(coffee);
                              setNewPost(coffee); })
                          .catch((e)=> {console.log("this error occurred: "+ e);
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

            <div
                {...getRootProps()}
                className="mt-2 border-2 border-dashed border-white p-4 text-center bg-grey cursor-pointer text-grey text-sm "
            >
                <input {...getInputProps()} />

                {isDragActive ? (
                    <p>Drop the image here…</p>
                ) : picture ? (
                    <img
                        src={picture}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-md"
                    />
                ) : (
                    <p>Add your image here!</p>
                )}
            </div>

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
