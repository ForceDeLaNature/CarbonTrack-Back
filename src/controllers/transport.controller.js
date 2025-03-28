const {distancematrixt} = require('../../service/api_google');

const getTransportEmissions = async (req, res) => {
    const { distance, transport } = req.body;
try {
    // Validation des entrées
    if (!distance || distance <= 0) {
        return res
            .status(400) // BAD REQUEST
            .json({ message: 'La distance est invalide. Elle doit être un nombre positif.1' });
    }

    if (!transport || transport.length === 0) {
        return res
            .status(400) // BAD REQUEST
            .json({ message: 'Le transport est invalide. Il doit être une chaîne de caractères non vide2' });
    }
    // Appel à la fonction distancematrix
    const data = await distancematrixt(distance, transport);
    res.json(data);

} catch (error) {
    console.error('Erreur dans getTransportEmissions:', error.message);
    res
        .status(500) // INTERNAL SERVER ERROR
        .json({ message: 'Erreur interne du serveur.' });
}
}

module.exports = { getTransportEmissions };

