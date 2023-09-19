import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign:"center"
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 12,

  },
  tableCell: {
    margin: "auto",
    padding: 5,
  },
});

const PDFReport = ({ userList }) => {


  userList.map((compte, index) => (
    console.log(compte.numero+' '+compte.compte+' '+compte.classe)
    

    ))



  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>PLAN COMPTABLE</Text>
        </View>
        <View style={styles.table}>

          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>NUMERO</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>COMPTE</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>CLASSE</Text>
            </View>
          
          </View>

          {userList.map((compte, index) => (
           <View key={index} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>NUMERO</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>COMPTE</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>CLASSE</Text>
            </View>
          
          </View>
          ))}

       

         
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;


