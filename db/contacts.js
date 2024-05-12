export const getContacts = async (db) => {
  try {
    const contacts = [];
    await new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM Contacts2",
            [],
            (_, results) => {
              for (let i = 0; i < results.rows.length; i++) {
                contacts.push(results.rows.item(i));
              }
              resolve();
            },
            (_, error) => {
              console.error("Failed to execute query:", error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error("Transaction error:", error);
          reject(error);
        }
      );
    });
    //console.log("Retrieved contacts:", contacts);
    return contacts;
  } catch (error) {
    console.error("Failed to get Contacts from database:", error);
    throw error;
  }
};

export const addContacts = async (db, contact) => {
  const selectQuery = "SELECT * FROM Contacts2 WHERE phoneNumber = ?";
  const insertQuery =
    "INSERT INTO Contacts2 (imageUri, fullName, phoneNumber, landlineNumber,isFavourite) VALUES (?, ?, ?, ?,?);";
  const values = [
    contact.imageUri,
    contact.fullName,
    contact.phoneNumber,
    contact.landlineNumber,
    contact.isFavourite,
  ];
  try {
    await db.transaction(async (tx) => {
      // Check if a contact with the phone number already exists
      await tx.executeSql(
        selectQuery,
        [contact.phoneNumber],
        async (_, { rows }) => {
          if (rows.length > 0) {
            console.log("Contact with this phone number already exists");
          } else {
            await tx.executeSql(
              insertQuery,
              values,
              () => {
                console.log("Contact added successfully");
              },
              () => {
                console.log("Error adding contact");
              }
            );
          }
        }
      );
    });
  } catch (error) {
    console.error("Failed to insert data:", error);
  }
};

export const deleteContact = async (db, id) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql("DELETE FROM Contacts2 WHERE id = ?;", [id]);
      console.log("Contact deleted successfully");
    });
  } catch (error) {
    console.error("Failed to delete contact:", error);
    throw error;
  }
};

export const editContact = async (db, contact) => {
  const selectQuery = "SELECT * FROM Contacts2 WHERE phoneNumber = ?";
  const updateQuery =
    "UPDATE Contacts2 SET imageUri = ?, fullName = ?, phoneNumber = ?, landlineNumber = ?, isFavourite = ? WHERE id = ?;";

  const { id, imageUri, fullName, phoneNumber, landlineNumber, isFavourite } =
    contact;
  const values = [
    imageUri,
    fullName,
    phoneNumber,
    landlineNumber,
    isFavourite,
    id,
  ];

  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        updateQuery,
        values,
        () => {
          console.log("Contact edited successfully");
        },
        () => {
          console.log("Error editing contact");
        }
      );
    });
  } catch (error) {
    console.error("Failed to update contact:", error);
    throw error;
  }
};
