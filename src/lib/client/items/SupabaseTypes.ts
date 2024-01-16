export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Businesses: {
        Row: {
          builtwith: string | null
          craft: string | null
          description: string | null
          dunandbradsheet: string | null
          id: string
          image: string | null
          interview: string | null
          latitude: number | null
          linkedin: string | null
          longitude: number | null
          name: string
          priority: number | null
          similarweb: string | null
          url: string | null
          wikipedia: string | null
        }
        Insert: {
          builtwith?: string | null
          craft?: string | null
          description?: string | null
          dunandbradsheet?: string | null
          id?: string
          image?: string | null
          interview?: string | null
          latitude?: number | null
          linkedin?: string | null
          longitude?: number | null
          name: string
          priority?: number | null
          similarweb?: string | null
          url?: string | null
          wikipedia?: string | null
        }
        Update: {
          builtwith?: string | null
          craft?: string | null
          description?: string | null
          dunandbradsheet?: string | null
          id?: string
          image?: string | null
          interview?: string | null
          latitude?: number | null
          linkedin?: string | null
          longitude?: number | null
          name?: string
          priority?: number | null
          similarweb?: string | null
          url?: string | null
          wikipedia?: string | null
        }
        Relationships: []
      }
      Businesses_tags: {
        Row: {
          architecture: boolean
          banking: boolean
          id: string
          legal: boolean
          name: string
          real_estate: boolean
          software: boolean
          television: boolean
          video: boolean
        }
        Insert: {
          architecture?: boolean
          banking?: boolean
          id?: string
          legal?: boolean
          name: string
          real_estate?: boolean
          software?: boolean
          television?: boolean
          video?: boolean
        }
        Update: {
          architecture?: boolean
          banking?: boolean
          id?: string
          legal?: boolean
          name?: string
          real_estate?: boolean
          software?: boolean
          television?: boolean
          video?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "Businesses_tags_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Businesses_tags_name_fkey"
            columns: ["name"]
            isOneToOne: true
            referencedRelation: "Businesses"
            referencedColumns: ["name"]
          }
        ]
      }
      defferentimportold: {
        Row: {
          builtwith: string | null
          id: string
          name: string | null
          similarweb: string | null
          url: string | null
        }
        Insert: {
          builtwith?: string | null
          id?: string
          name?: string | null
          similarweb?: string | null
          url?: string | null
        }
        Update: {
          builtwith?: string | null
          id?: string
          name?: string | null
          similarweb?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_headquarters: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      updategeography:
        | {
            Args: Record<PropertyKey, never>
            Returns: undefined
          }
        | {
            Args: {
              uuid_param: string
              lat: number
              long: number
            }
            Returns: undefined
          }
      updategeography2: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
