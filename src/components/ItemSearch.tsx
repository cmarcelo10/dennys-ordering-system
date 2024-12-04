import React, { useState } from 'react';
import SearchBar from './SearchBar'; // Adjust the import path
import { Box, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@mui/material';
import { HandheldsList } from '../types/HandheldsMenu';

const ItemSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(HandheldsList);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter items based on the search query
        setFilteredItems(
            HandheldsList.filter((item) =>
                item.name.toLowerCase().includes(query)
            )
        );
    };

    return (
        <Box >
            {/* Search Bar */}
            <SearchBar placeholder="Search" onChange={handleSearch}/>
            {/* Dropdown Menu */}
            {searchQuery && (
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50px', 
                        right: 20,
                        width: '270px',
                        zIndex: 1100,
                        borderRadius: 2,
                        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                    }}>
                    <List>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <ListItem
                                    key={item.name}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                        marginBottom:'8px'
                                    }}
                                >
                                    {/* Item Image */}
                                    <ListItemAvatar>
                                        <Avatar
                                            src={item.image}
                                            alt={item.name}
                                            sx={{ width: 56, height: 56, marginRight:'12px'}}
                                        />
                                    </ListItemAvatar>
                                    {/* Item Details */}
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`$${item.price.toFixed(2)}`}
                                        primaryTypographyProps={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: '12px',
                                            color: 'gray',
                                        }}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText
                                    primary="No items found."
                                    primaryTypographyProps={{
                                        fontSize: '13px',
                                        color: 'gray',
                                    }}
                                />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default ItemSearch;
