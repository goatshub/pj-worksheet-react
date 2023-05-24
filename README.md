Full code for Project worksheet react on Google Apps Script.

Apps Script project: https://script.google.com/home/projects/11NkgumVLLWQzVuoA8GjPtK11P8qxikUe9TJ8ntr8La3Kk1sJCie5QFNL/edit

## Steps

**1. Clone Repo**

```bash
git clone https://github.com/goatshub/pj-worksheet-react.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Set up Apps Script by Clasp**

Make sure Clasp is installed and log in to the correct gmail account.
Use one with permission to script id in .clasp.json with all required services permissions.

```bash
clasp init

npm run glogin
or
npm run glogout
```

**4. Compile React App**

Build React code in src folder and compiled into html to replace previous version file in apps-script > index.html

```bash
npm run build
```

**5. Push to GS server**

Pull first to make sure that the files are recent updated

```bash
npm run gpull
```

then gpush for one time push. gwatch for automatic push after file is modified in apps-script folder
(either by build command or apps scripts code edit)

```bash
npm run gpush
or
npm run gwatch
```

**6. Test or manage deployment**

Deploy > Test deployments for development

Deploy > Manage deployments > version > new version for updating live deployment
