const sortAndShowButtons = (
    <div className="container">
      <div className="row">
        <div className="p-2 col-sm d-flex justify-content-center space-between">
          <select
            onChange={e => {
              setBookOrArticle(e.target.value);
            }}
          >
            <option value="articles">Artikler</option> <option value="books">Bøger</option>
          </select>
          <Button onClick={() => handleSort("title")} variant="outline-secondary" className="mx-2">
            Sorter efter titel {getSortArrow("title")}
          </Button>
          <Button onClick={() => handleSort("releaseYear")} variant="outline-secondary" className="mx-2">
            Sorter efter udgivelsesår {getSortArrow("releaseYear")}
          </Button>
        </div>
      </div>
    </div>
  );