import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import axiosInstance from './axios-instance'
import { People, Character } from '@/types/sw-types'

class Api {
  private shouldRetry(error: AxiosError): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status < 600)
    )
  }

  private handleError(error: AxiosError): Error {
    if (error.response?.data) {
      return new Error( 'An error occurred')
    }
    return new Error('Network error or server is unavailable')
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>,
    retries = 3
  ): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(url, { params })
      return response.data
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error) && this.shouldRetry(error)) {
        // Wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (3 - retries + 1))
        )
        return this.get<T>(url, params, retries - 1)
      }
      throw this.handleError(error as AxiosError)
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    retries = 3,
    config?: AxiosRequestConfig<unknown>
  ): Promise<T> {
    try {
      const response = await axiosInstance.post<T>(
        url,
        data,
        config
      )
      return response.data
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error) && this.shouldRetry(error)) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (3 - retries + 1))
        )
        return this.post<T>(url, data, retries - 1)
      }
      throw this.handleError(error as AxiosError)
    }
  }

  async delete<T>(url: string, retries = 3): Promise<T> {
    try {
      const response = await axiosInstance.delete<T>(url)
      return response.data
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error) && this.shouldRetry(error)) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (3 - retries + 1))
        )
        return this.delete<T>(url, retries - 1)
      }
      throw this.handleError(error as AxiosError)
    }
  }

  async put<T>(url: string, data?: unknown, retries = 3): Promise<T> {
    try {
      const response = await axiosInstance.put<T>(url, data)
      return response.data
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error) && this.shouldRetry(error)) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (3 - retries + 1))
        )
        return this.put<T>(url, data, retries - 1)
      }
      throw this.handleError(error as AxiosError)
    }
  }

  async patch<T>(url: string, data?: unknown, retries = 3): Promise<T> {
    try {
      const response = await axiosInstance.patch<T>(url, data)
      return response.data
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error) && this.shouldRetry(error)) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (3 - retries + 1))
        )
        return this.patch<T>(url, data, retries - 1)
      }
      throw this.handleError(error as AxiosError)
    }
  }

  // ---------------------------------------- API CALLS ---------------------------------------- //
  // ----- SWAPI ----- //
  async getPeople(): Promise<People> {
    return this.get<People>(`/people}`)
  }

  async getCharacter(id: string): Promise<Character> {
    return this.get<Character>(`/people/${id}`)
  }
}

export const api = new Api()