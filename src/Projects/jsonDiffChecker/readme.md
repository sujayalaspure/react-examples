## Json Diff Checker

### BUGS:

- [x] closing bracket not rendering correctly. if having empty object.
- [ ] not rendering if having consecutive nested objects
- [x] last remaining closing bracket not rendering correctly
- [ ] check for null and undefined values
- [x] last line number not updating correctly
- [ ] render empty array/ object on the same line.
- [x] from DiffView remove ref for every key. Only add to the extra keys.
- [ ] rows in DiffView is re-rendering on hide/show operation
- [ ] Update copy diff text when rendered from url

### Features:

- [x] compare two json files
- [x] Fetch data from json url
- [x] show diff in file preview
- [x] show extra keys
- [x] click on the key to scroll to the key in the file
- [x] copy diff as text
- [x] show meta data
- [x] show time taken to compare
- [ ] Optimize the diff algorithm
- [ ] diff preview add load more button
- [ ] Scroll both the files simultaneously
- [ ] Add file name change option while copying diff as text
- [ ] Write Test cases
