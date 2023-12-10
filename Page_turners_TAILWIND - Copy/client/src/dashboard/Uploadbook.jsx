import React, { useState } from 'react'
import { Button, Checkbox, TextInput } from 'flowbite-react';
import { Label, Textarea } from 'flowbite-react';
const Uploadbook = () => {
    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Mistery",
        "Programming",
        "Science Fiction",
        "Fantacy",
        "Horror",
        "Bibiliography",
        "Autobiography",
        "History",
        "Self-help",
        "Memoir",
        "Business",
        "Children Books",
        "Travel",
        "Religion",
        "Art and Design"
    ]
    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
    const handleChangeSelectedValue = (event) => {
        console.log(event.target.value)
        setSelectedBookCategory(event.target.value);
    }
    const handleBookSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imageUrl = form.imageUrl.value;
        const category = form.categoryName.value;
        const bookDescription = form.bookDescription.value;
        const bookPdfUrl = form.bookPdfUrl.value;

        const bookObj = {
            bookTitle, authorName, imageUrl, category, bookDescription, bookPdfUrl
        }

        // send data to db

        fetch("http://localhost:5000/upload-book", {
            method: "POST",
            headers: {
                "content-Type": "application/json",

            },
            body: JSON.stringify(bookObj)

        }).then(res => res.json()).then(data => {
            alert("Book uploaded successfully!!!")
            form.reset()

        })
    }
    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>upload A book</h2>
            <form onSubmit={handleBookSubmit} className="flex lg:w-{1180px} flex-col flex-wrap gap-4">
                <div className='flex gap-8'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="bookTitle" value="Book Title " />
                        </div>
                        <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book name" required />
                    </div>

                    {/* author name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="authorName" value="Author Name " />
                        </div>
                        <TextInput id="authorName" name='authorName' type="text" placeholder="Author name" required />
                    </div>
                </div>

                {/* second row */}

                <div className='flex gap-8'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="imageUrl" value="Book Img url" />
                        </div>
                        <TextInput id="imageUrl" name='imageUrl' type="text" placeholder="Book image " required />
                    </div>

                    {/* Category */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="inputState" value="Book Category" />
                        </div>
                        <select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory}
                            onChange={handleChangeSelectedValue}
                        >
                            {
                                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                            }

                        </select>


                    </div>
                </div>

                {/* Book description */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="bookDescription" value="Book Description" />
                    </div>
                    <Textarea id="bookDescription" placeholder="write the book description..." required rows={4}
                        className='w-full'
                    />

                </div>

                {/* book pdf link */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
                    </div>
                    <TextInput id="bookPdfUrl" type="text" placeholder="book pdf url" required />
                </div>
                <Button type="submit" className='mt-5'>Upload Book</Button>

            </form>
        </div>
    )
}

export default Uploadbook