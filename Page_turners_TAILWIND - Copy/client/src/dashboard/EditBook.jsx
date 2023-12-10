import React, { useState } from 'react'
import { Button, Checkbox, TextInput, Label, Textarea } from 'flowbite-react';
import { useLoaderData, useParams } from 'react-router-dom';
// import { useState } from 'react';

const EditBook = () => {
    const { id } = useParams();
    const { bookTitle, authorName, imageUrl, category, bookDescription, bookPdfUrl } = useLoaderData();
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
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imageUrl = form.imageUrl.value;
        const category = form.categoryName.value;
        const bookDescription = form.bookDescription.value;
        const bookPdfUrl = form.bookPdfUrl.value;

        const updateBookObj = {
            bookTitle, authorName, imageUrl, category, bookDescription, bookPdfUrl
        }

        // update the book and send to data base
        fetch(`http://localhost:5000/book/${id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(updateBookObj)

            }
        ).then(res => res.json()).then(data => {
            alert("Book updated successfully!!!")


        })

    }
    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>update the book data</h2>
            <form onSubmit={handleUpdate} className="flex lg:w-{1180px} flex-col flex-wrap gap-4">
                <div className='flex gap-8'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="bookTitle" value="Book Title " />
                        </div>
                        <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book name" required
                            defaultValue={bookTitle} />
                    </div>

                    {/* author name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="authorName" value="Author Name " />
                        </div>
                        <TextInput id="authorName" name='authorName' type="text" placeholder="Author name" required defaultValue={authorName} />
                    </div>
                </div>

                {/* second row */}

                <div className='flex gap-8'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="imageUrl" value="Book Img url" />
                        </div>
                        <TextInput id="imageUrl" name='imageUrl' type="text" placeholder="Book image " required defaultValue={imageUrl} />
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
                        defaultValue={bookDescription}
                    />

                </div>

                {/* book pdf link */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
                    </div>
                    <TextInput id="bookPdfUrl" type="text" placeholder="book pdf url" required
                        defaultValue={bookPdfUrl}
                    />
                </div>
                <Button type="submit" className='mt-5'>Update Book</Button>

            </form>
        </div>
    )

}

export default EditBook