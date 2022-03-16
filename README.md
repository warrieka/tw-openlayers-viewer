# Trage wegen in Kaart

## Goal
Create reusable openlayers mapping application for use by Tragen Wegen VZW. 

## Dependenies
	
We use nodejs/npm to install and manage dependenies: <https://nodejs.org> 

We use the following pakages: 	
- React framework: <https://reactjs.org>
- Packaging: <https://parceljs.org>
- UI: <https://reach.tech>  of https://ant.design/  ??
- Sidebar: <https://www.npmjs.com/package/react-pro-sidebar>
- Kaart: <https://openlayers.org> 

They are declared in the `package.json` and can be installed wit npm. 

For the location search we will the geopunt location service from the Flemish goverment 

<https://loc.geopunt.be/>

## Installation

Git and nodejs need te be installed. 

```
git clone https://github.com/warrieka/tragewegen
cd tragewegen
npm install
```

To start the devellopement server: 

```
npm run start
```

To make a production build: 

```
npm run build
```