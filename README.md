# TypeScript Developer Interview Question

## Scenario
You're building a Star Wars character explorer application. Using the Star Wars API (SWAPI), create a React component that displays a paginated list of characters with search functionality.

## Technical Requirements

### API Endpoint
- Base URL: `https://swapi.dev/api/`
- Characters endpoint: `https://swapi.dev/api/people/`
- Individual character: `https://swapi.dev/api/people/{id}/`


### UI Framework & Styling Choice
**You have complete freedom to choose your preferred UI framework or styling approach:**

**Option A: Tailwind CSS** (Default in project setup)
- Utility-first CSS framework
- Rapid development with pre-built classes
- Highly customizable with configuration

**Option B: SCSS/SASS**
- Custom styling with variables and mixins
- Full creative control over design
- Modular component-based styles

**Option C: UI Component Libraries**
- **Material-UI (MUI)**: Material Design components
- **Chakra UI**: Modular and accessible components
- **Ant Design**: Enterprise-ready components
- **Mantine**: Full-featured components and hooks

**Option D: Headless UI + Custom Styles**
- Unstyled, accessible components
- Complete design freedom
- CSS-in-JS libraries (styled-components, emotion)

**Note**: Choose the approach you're most comfortable with or that best demonstrates your skills. The focus is on TypeScript, SWR, and React patterns - not specific styling choices.

### Required Technologies
- **TypeScript**: Strict typing for all data structures
- **SWR**: For data fetching and caching
- **Axios**: For HTTP requests
- **React**: Functional components with hooks

### Core Features to Implement

1. **Pagination**
   - Display 10 characters per page
   - Show current page and total pages
   - Next/Previous navigation
   - Jump to specific page

2. **Search/Filtering**
   - Real-time search by character name
   - Clear search functionality
   - Handle empty search results

3. **Character Details**
   - Click on character to view detailed information
   - Display: name, height, mass, birth year, gender, homeworld
   - Handle loading and error states

4. **Error Handling**
   - Network errors
   - API rate limiting
   - Invalid page numbers
   - Character not found

## Expected Deliverables

### 1. TypeScript Interfaces
```typescript
// Define interfaces for:
// - API response structure
// - Character data
// - Pagination metadata
// - Search parameters
```

### 2. Custom Hooks
```typescript
// Create hooks for:
// - Fetching paginated characters
// - Fetching individual character details
// - Search functionality
```

### 3. React Components
```typescript
// Implement:
// - CharacterList component
// - CharacterCard component
// - Pagination component
// - SearchBar component
// - CharacterDetail modal/page
```

### 4. SWR Configuration
```typescript
// Configure SWR with:
// - Custom fetcher using Axios
// - Error handling
// - Cache configuration
```

## Sample API Responses

### Characters List Response
```json
{
  "count": 82,
  "next": "https://swapi.dev/api/people/?page=2",
  "previous": null,
  "results": [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "https://swapi.dev/api/planets/1/",
      "url": "https://swapi.dev/api/people/1/"
    }
  ]
}
```

## Evaluation Criteria

### TypeScript Proficiency (25%)
- [ ] Proper interface definitions
- [ ] Generic types usage
- [ ] Union types for API states
- [ ] Strict null checking
- [ ] Type guards for runtime validation

### SWR Implementation (25%)
- [ ] Correct hook usage (`useSWR`, `useSWRInfinite`)
- [ ] Custom fetcher configuration
- [ ] Error boundary integration
- [ ] Cache key strategies
- [ ] Loading state management

### Code Architecture (25%)
- [ ] Component separation and reusability
- [ ] Custom hooks for business logic
- [ ] Proper state management
- [ ] Clean function composition
- [ ] Performance optimizations (useMemo, useCallback)

### User Experience (25%)
- [ ] Smooth pagination transitions
- [ ] Responsive search (debouncing)
- [ ] Loading skeletons
- [ ] Error message clarity
- [ ] Accessibility considerations

## Bonus Points
- [ ] Implement infinite scroll instead of traditional pagination
- [ ] Add favorites functionality with local storage
- [ ] Implement advanced filtering (by gender, homeworld, etc.)
- [ ] Add unit tests for custom hooks
- [ ] Responsive design implementation
- [ ] Dark/light theme toggle
- [ ] Use React Table from TanStack for advanced table features (sorting, column management, etc.)