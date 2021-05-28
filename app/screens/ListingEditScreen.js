import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import React, { useState } from "react";

import CategoryPickerItem from "../components/CategoryPickerItem";
import FormDateTimePicker from "../components/forms/FormDateTimePicker";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import { StyleSheet } from "react-native";
import UploadScreen from "./UploadScreen";
import { getAuthContext } from "../auth/auth";
import listingsApi from "../api/listings";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  location: Yup.string().required().min(1).label("Location"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#E51400",
    icon: "🎺",
    label: "Concert",
    value: 1,
  },
  {
    backgroundColor: "#A20025",
    icon: "🤔",
    label: "Lecture",
    value: 2,
  },
  {
    backgroundColor: "#D80073",
    icon: "🌶",
    label: "Food",
    value: 3,
  },
  {
    backgroundColor: "#F472D0",
    icon: "🪐",
    label: "Comedy",
    value: 4,
  },
  {
    backgroundColor: "#AA00FF",
    icon: "🎾",
    label: "Sports",
    value: 5,
  },
  {
    backgroundColor: "#6A00FF",
    icon: "🪅",
    label: "Arts",
    value: 6,
  },
  {
    backgroundColor: "#0050EF",
    icon: "🍑",
    label: "Party",
    value: 7,
  },
  {
    backgroundColor: "#1BA1E2",
    icon: "🔑",
    label: "Tutorial",
    value: 8,
  },
  {
    backgroundColor: "#00ABA9",
    icon: "🍴",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  const { user } = getAuthContext();

  const [uploadVisible, setUploadVisible] = useState(false);

  const handleSubmit = async (listing, { resetForm }) => {
    try {
      setUploadVisible(true);

      const data = { displayName: user.displayName, uid: user.uid, ...listing };
      const result = await listingsApi.addListing({
        displayName: user.displayName,
        uid: user.uid,
        ...listing,
      });

      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing");
      }

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          location: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormDateTimePicker name="time_start" />
        <FormField
          maxLength={255}
          name="title"
          placeholder="Title"
          width="75%"
        />
        <FormField
          maxLength={255}
          name="location"
          placeholder="Location"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={6}
          placeholder="Description"
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
