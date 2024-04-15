import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d9cdb',
    justifyContent: 'center',
    padding: 40
  },

  banner: {
    width: '100%',
    resizeMode: 'contain',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#56ccf2',
  },

  buttonSecondary: {
    backgroundColor: '#04d361',
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
  },

  totalConnections: {
    color: '#d4c2ff',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  },

});

export default styles;