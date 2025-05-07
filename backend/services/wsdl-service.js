const express = require("express");
const soap = require("soap");
const mongoose = require("mongoose");
const app = express();
const port = 3002;

// Conectar a MongoDB
mongoose.connect("mongodb+srv://leoibarralopez:admin@repositoriodocumentos.xtfqiad.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 500000,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error conectando a MongoDB:", err));

// Definir el esquema de Document
const documentSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  descripcion: String,
  fecha: Date,
  tipo: String,
  categoria: String,
  archivo_url: String,
  usuario_responsable: mongoose.Schema.Types.ObjectId,
  fecha_subida: Date,
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  versiones: [String]
});

// Verificar si el modelo ya está definido para evitar errores
const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);

// Definir el servicio SOAP
const service = {
  DocumentService: {
    DocumentPort: {
      getDocumentStats: async function (args, callback) {
        try {
          const documents = await Document.find({});

          if (documents.length === 0) {
            return callback(null, {
              total: 0,
              categories: []
            });
          }

          const total = documents.length;
          const categories = [...new Set(documents.map((doc) => doc.categoria))]; // Categorías únicas

          return callback(null, {
            total,
            categories
          });
        } catch (error) {
          console.error("Error obteniendo datos:", error);
          return callback(error);
        }
      },
    },
  },
};

// Definir el archivo WSDL
const xml = `
<definitions name="DocumentService" xmlns="http://schemas.xmlsoap.org/wsdl/"
  xmlns:tns="http://example.com/DocumentService" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
  
  <types>
    <xsd:schema>
      <xsd:element name="getDocumentStatsRequest" type="xsd:string"/>
      <xsd:element name="getDocumentStatsResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="total" type="xsd:int"/>
            <xsd:element name="categories" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>
  
  <message name="getDocumentStatsRequest">
    <part name="request" type="xsd:string"/>
  </message>
  
  <message name="getDocumentStatsResponse">
    <part name="response" type="tns:getDocumentStatsResponse"/>
  </message>
  
  <portType name="DocumentPortType">
    <operation name="getDocumentStats">
      <input message="tns:getDocumentStatsRequest"/>
      <output message="tns:getDocumentStatsResponse"/>
    </operation>
  </portType>
  
  <binding name="DocumentBinding" type="tns:DocumentPortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="getDocumentStats">
      <soap:operation soapAction=""/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  
  <service name="DocumentService">
    <port name="DocumentPort" binding="tns:DocumentBinding">
      <soap:address location="http://localhost:${port}/wsdl"/>
    </port>
  </service>
</definitions>
`;

app.use(express.json()); // Middleware para analizar solicitudes JSON

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servicio WSDL corriendo en http://localhost:${port}/wsdl`);
});

// Habilitar el servicio SOAP en la ruta /wsdl
soap.listen(app, "/wsdl", service, xml);
