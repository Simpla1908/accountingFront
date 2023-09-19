import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 12,
  },
  tableCellNum: {
    padding: 5,
    width: "100px",

  },
  tableCellCompte: {
    padding: 5,
    width: "250px",

  },
  tableCellClasse: {
    padding: 5,
    width: "150px",

  },
});

const itemsPerPage = 50; // Nombre d'éléments par page

const PDFReport = ({ userList }) => {
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  return (
    <Document>
      {Array.from({ length: totalPages }, (_, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>PLAN COMPTABLE - Page {pageIndex + 1}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCellNum}>
                <Text>NUMERO</Text>
              </View>
              <View style={styles.tableCellCompte}>
                <Text>COMPTE</Text>
              </View>
              <View style={styles.tableCellClasse}>
                <Text>CLASSE</Text>
              </View>
            </View>
            {userList
              .slice(
                pageIndex * itemsPerPage,
                (pageIndex + 1) * itemsPerPage
              )
              .map((compte, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCellNum}>
                    <Text>{compte.numero}</Text>
                  </View>
                  <View style={styles.tableCellCompte}>
                    <Text>{compte.compte}</Text>
                  </View>
                  <View style={styles.tableCellClasse}>
                    <Text>{compte.classe}</Text>
                  </View>
                </View>
              ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PDFReport;
