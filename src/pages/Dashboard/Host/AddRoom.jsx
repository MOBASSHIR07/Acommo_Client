import AddRoomForm from "../../../components/Form/AddRoomForm";
import { useState } from 'react'
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [dates, setdates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);


  const handleDates = range => {
    console.log(range);
    setdates([range.selection])

  }

  const { mutateAsync } = useMutation({


    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post(`/addroom`, roomData)
      return data
    },
    onSuccess: () => {
      toast.success('Your Room Added')
      setLoading(false)
      navigate('/dashboard/mylistings')
    },
    onError:()=>{
        setLoading(false)
    }


  })


  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target

    // ✅ Get form values
    const location = form.location.value
    const category = form.category.value
    const title = form.title.value
    const price = form.price.value
    const total_guest = form.total_guest.value
    const bedrooms = form.bedrooms.value
    const bathrooms = form.bathrooms.value
    const description = form.description.value
    const image = form.image.files[0]

    // ✅ Basic validation
    if (!location || !category || !title || !price || !image) {
      alert('Please fill out all required fields!')
      setLoading(false);
      return
    }
    // ✅ Negative or invalid number validation
    if (price <= 0 || total_guest <= 0 || bedrooms < 0 || bathrooms < 0) {
      toast.error('Numeric fields must be positive!');
          setLoading(false);
      return;
    }
    try {
      const image_url = await imageUpload(image)

      // ✅ Build room object
      const roomData = {
        host: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'Unknown',
          photo: user?.photoURL || ''
        },
        location,
        category,
        title,
        price: parseFloat(price),
        total_guest: parseInt(total_guest),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        description,
        image_url,
        availability: {
          startDate: dates[0].startDate,
          endDate: dates[0].endDate
        },
        createdAt: new Date()

      }

      await mutateAsync(roomData);
      console.log(roomData);



    } catch (err) {
      console.log(err);
       setLoading(false)
       toast.error(err)
    }
    finally {
  setLoading(false); 
}



  }

  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddRoom;