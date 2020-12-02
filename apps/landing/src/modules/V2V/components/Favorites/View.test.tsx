import 'mobx-react-lite/batchingForReactDom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import FavoritesNetworker from './FavoritesNetworker';
import View from './View';
import ViewModel from './ViewModel';
import { InventoryStore } from '../../store/inventoryStore';
import { FavoritesStore } from '../../store/favoritesStore';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Favorites', () => {
  describe('Favorite button', () => {
    const invStore = new InventoryStore();
    const favStore = new FavoritesStore();
    favStore.isDialogOpen = false;
    const favNetworker = new FavoritesNetworker('some-url');

    const viewModel = new ViewModel(invStore, favStore, favNetworker);
    beforeEach(() => {
      viewModel.handleMount = jest.fn();
      viewModel.isSnackbarOpen = jest.fn();
      viewModel.isLoading = jest.fn(() => false);
    });

    describe('When Logged Out', () => {
      beforeEach(() => {
        viewModel.handleDialog = jest.fn();
        viewModel.isLoggedIn = jest.fn(() => false);
        viewModel.isFavorited = jest.fn(() => false);
      });
      it('should call handle Dialog if not logged in', () => {
        render(<View viewModel={viewModel} />);
        const favoriteContainer = screen.getByText('ADD TO FAVORITES');
        fireEvent.click(favoriteContainer);
        expect(viewModel.handleDialog).toHaveBeenCalled();
      });
    });

    describe('When Logged In', () => {
      beforeEach(() => {
        viewModel.isLoggedIn = jest.fn(() => true);
        viewModel.addFavorite = jest.fn();
        viewModel.removeFavorite = jest.fn();
      });
      it('should call addFavorite if not favorited', () => {
        viewModel.isFavorited = jest.fn(() => false);
        render(<View viewModel={viewModel} />);
        const favoriteContainer = screen.getByText('ADD TO FAVORITES');
        fireEvent.click(favoriteContainer);
        expect(viewModel.addFavorite).toHaveBeenCalled();
      });

      it('should call removeFavorites if favorited', () => {
        viewModel.isFavorited = jest.fn(() => true);
        render(<View viewModel={viewModel} />);
        const favoriteContainer = screen.getByText('FAVORITED');
        fireEvent.click(favoriteContainer);
        expect(viewModel.removeFavorite).toHaveBeenCalled();
      });
    });

    afterEach(() => {
      expect(viewModel.handleMount).toHaveBeenCalled();
      expect(viewModel.isSnackbarOpen).toHaveBeenCalled();
    });
  });
});
