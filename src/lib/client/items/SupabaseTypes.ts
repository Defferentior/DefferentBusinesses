export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Businesses: {
        Row: {
          address: string | null
          biz_int: string | null
          biz_int_index: number
          builtwith: string | null
          category: string
          cbinsights: string | null
          craft: string | null
          crunchbase: string | null
          dunandbradsheet: string | null
          glassdoor: string | null
          id: string
          image: string | null
          latitude: number | null
          linkedin: string | null
          longitude: number | null
          name: string
          priority: number | null
          similarweb: string | null
          url: string
          wappalyzer: string | null
          wikipedia: string | null
        }
        Insert: {
          address?: string | null
          biz_int?: string | null
          biz_int_index?: number
          builtwith?: string | null
          category: string
          cbinsights?: string | null
          craft?: string | null
          crunchbase?: string | null
          dunandbradsheet?: string | null
          glassdoor?: string | null
          id?: string
          image?: string | null
          latitude?: number | null
          linkedin?: string | null
          longitude?: number | null
          name: string
          priority?: number | null
          similarweb?: string | null
          url?: string
          wappalyzer?: string | null
          wikipedia?: string | null
        }
        Update: {
          address?: string | null
          biz_int?: string | null
          biz_int_index?: number
          builtwith?: string | null
          category?: string
          cbinsights?: string | null
          craft?: string | null
          crunchbase?: string | null
          dunandbradsheet?: string | null
          glassdoor?: string | null
          id?: string
          image?: string | null
          latitude?: number | null
          linkedin?: string | null
          longitude?: number | null
          name?: string
          priority?: number | null
          similarweb?: string | null
          url?: string
          wappalyzer?: string | null
          wikipedia?: string | null
        }
        Relationships: []
      }
      Businesses_add: {
        Row: {
          address: string | null
          biz_int: string | null
          builtwith: string | null
          category: string
          cbinsights: string | null
          craft: string | null
          crunchbase: string | null
          description: string | null
          dunandbradsheet: string | null
          glassdoor: string | null
          id: string
          image: string | null
          latitude: number | null
          linkedin: string | null
          longitude: number | null
          name: string
          priority: number | null
          similarweb: string | null
          testURL: string | null
          url: string | null
          wappalyzer: string | null
          wikipedia: string | null
        }
        Insert: {
          address?: string | null
          biz_int?: string | null
          builtwith?: string | null
          category: string
          cbinsights?: string | null
          craft?: string | null
          crunchbase?: string | null
          description?: string | null
          dunandbradsheet?: string | null
          glassdoor?: string | null
          id?: string
          image?: string | null
          latitude?: number | null
          linkedin?: string | null
          longitude?: number | null
          name: string
          priority?: number | null
          similarweb?: string | null
          testURL?: string | null
          url?: string | null
          wappalyzer?: string | null
          wikipedia?: string | null
        }
        Update: {
          address?: string | null
          biz_int?: string | null
          builtwith?: string | null
          category?: string
          cbinsights?: string | null
          craft?: string | null
          crunchbase?: string | null
          description?: string | null
          dunandbradsheet?: string | null
          glassdoor?: string | null
          id?: string
          image?: string | null
          latitude?: number | null
          linkedin?: string | null
          longitude?: number | null
          name?: string
          priority?: number | null
          similarweb?: string | null
          testURL?: string | null
          url?: string | null
          wappalyzer?: string | null
          wikipedia?: string | null
        }
        Relationships: []
      }
      Businesses_tags: {
        Row: {
          electronics: boolean
          housing: boolean
          id: string
          legal: boolean
          marketing: boolean | null
          name: string
          real_estate: boolean
          software: boolean
          television: boolean
          video: boolean
        }
        Insert: {
          electronics?: boolean
          housing?: boolean
          id?: string
          legal?: boolean
          marketing?: boolean | null
          name: string
          real_estate?: boolean
          software?: boolean
          television?: boolean
          video?: boolean
        }
        Update: {
          electronics?: boolean
          housing?: boolean
          id?: string
          legal?: boolean
          marketing?: boolean | null
          name?: string
          real_estate?: boolean
          software?: boolean
          television?: boolean
          video?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "Businesses_tags_name_fkey"
            columns: ["name"]
            isOneToOne: true
            referencedRelation: "Businesses"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "public_Businesses_tags_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      "Businesses-Answers": {
        Row: {
          answers: string | null
          asked_questions: boolean
          id: string
          image: string | null
          name: string
          question_accessible: boolean
          url: string | null
        }
        Insert: {
          answers?: string | null
          asked_questions?: boolean
          id: string
          image?: string | null
          name: string
          question_accessible?: boolean
          url?: string | null
        }
        Update: {
          answers?: string | null
          asked_questions?: boolean
          id?: string
          image?: string | null
          name?: string
          question_accessible?: boolean
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Businesses-Answers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "Businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Businesses-Answers_name_fkey"
            columns: ["name"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["name"]
          }
        ]
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
